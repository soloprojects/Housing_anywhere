const drones = (state = [], action) => {
  switch (action.type) {
    case 'ADD_DRONE':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
    default:
      return state
  }
}

export default drones
