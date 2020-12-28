const routes = (state = { route: [], ion: 0 }, action) => {
    let totalmass = state.ion;
    let newregion;
    switch (action.type) {
        case 'ADD_ROUTE':
            if (action.payload === null) {
                return state;
            }


            const lastRegion = state.route.slice(-1);
            let route = state.route;
            let newmass = 0;
            if (lastRegion.length !== 0) {
                const previousRegions = state.route.slice(0, -1);
                newmass = lastRegion[0].mass;
                const maneuver = action.payload.to.find(element => element.id === lastRegion[0].id);
                const newyears = Math.min(maneuver.min, maneuver.max);
                route = [...previousRegions, Object.assign({}, lastRegion[0], { maneuver, difficulty: maneuver.difficulty, years: newyears, thrust: newyears * state.ion * 5 + lastRegion[0].thrust })];
            }


            return {
                ...state,
                route: [...route, Object.assign({}, action.payload, { mass: newmass, aerobraking: false, extraMass: 0, rocketMass: 0, thrust: 0, juno: 0, atlas: 0, soyuz: 0, proton: 0, saturn: 0 })]
            }

        case 'REMOVE_ROUTE':

            return {
                ...state,
                route: state.route.slice(0, action.payload).map((region, i) => {
                    newregion = region;
                    if (action.payload === i + 1) {
                        newregion = Object.assign({}, region);
                        newregion.thrust -= state.ion * 5 * region.years;
                        delete newregion.maneuver;
                        delete newregion.years;
                        delete newregion.difficulty;
                    }
                    return newregion;
                })
            }

        case 'AEROBRAKE_TOGGLE':


            return {
                ...state,
                route: state.route.map((region, i) => {
                    newregion = region;
                    if (action.payload === i) {
                        const oldyears = region.years;
                        const newmaneuver = region.maneuver.aerobraking && !region.aerobraking ? region.maneuver.aerobraking : region.maneuver;
                        const newyears = Math.min(newmaneuver.min, newmaneuver.max);

                        newregion = Object.assign({}, region, { aerobraking: !region.aerobraking, difficulty: newmaneuver.difficulty, years: newyears, thrust: region.thrust + (newyears - oldyears) * state.ion * 5 });
                    }

                    return newregion;
                })
            }

        case 'CHANGE_MASS':

            totalmass = state.ion;
            const recalculatedRegions = state.route.map((region, i) => {
                let extraMass = region.extraMass;
                if (i === action.payload.i) {
                    extraMass = action.payload.mass;
                }
                totalmass += extraMass + region.rocketMass;
                return Object.assign({}, region, { extraMass, mass: totalmass });
            })

            return {
                ...state,
                route: recalculatedRegions
            }

        case 'CHANGE_YEARS':
            return {
                ...state,
                route: state.route.map((region, i) => {
                    if (i === action.payload.i) {
                        const maneuver = region.maneuver.aerobraking && region.aerobraking ? region.maneuver.aerobraking : region.maneuver;
                        let newdifficulty = region.difficulty;
                        if (region.years > action.payload.years) {
                            if (maneuver.min > action.payload.years) {
                                for (var j = 0; j < region.years - action.payload.years; j++) {
                                    newdifficulty *= 2;
                                }
                            }
                        } else {
                            if (maneuver.min >= action.payload.years) {
                                for (j = 0; j < action.payload.years - region.years; j++) {
                                    newdifficulty /= 2;
                                }
                            }
                        }
                        const thrustchange = region.thrust + (action.payload.years - region.years) * state.ion * 5;
                        newregion = Object.assign({}, region, { years: action.payload.years, thrust: thrustchange, difficulty: newdifficulty });
                        return newregion;
                    }
                    return Object.assign({}, region);
                })
            }
        case 'CHANGE_ROCKET':
            totalmass = state.ion;
            return {
                ...state,
                route: state.route.map((region, i) => {
                    newregion = region;
                    if (i === action.payload.i) {
                        const change = action.payload.count - region[action.payload.rocket.name];
                        newregion = Object.assign({}, newregion, { [action.payload.rocket.name]: action.payload.count, rocketMass: region.rocketMass + change * action.payload.rocket.mass, mass: region.mass + change * action.payload.rocket.mass, thrust: region.thrust + change * action.payload.rocket.thrust });
                    }
                    totalmass += newregion.extraMass + newregion.rocketMass;
                    return Object.assign({}, newregion, { mass: totalmass });
                })
            }
        case 'CHANGE_ION':
            totalmass = action.payload;
            let ionchange = action.payload - state.ion;
            return {
                ...state,
                ion: action.payload,
                route: state.route.map((region, i) => {
                    totalmass += region.extraMass + region.rocketMass;
                    const newionthrust = region.years ? region.thrust + ionchange * region.years * 5 : region.thrust;
                    return Object.assign({}, region, { mass: totalmass, thrust: newionthrust });
                })
            }
        default:
            return state
    }
}

export default routes;