import React, { Component } from 'react'
import HelloWorld from './components/HelloWorld'
import axios from 'axios'

class App extends Component {
  state = {
    animals: [],
    countOfLionsTigersAndBears: 0,
    totalAnimalCount: 0,
    jungleAnimals: []
  }
  componentDidMount() {
    axios.get('https://localhost:5001/api/Animals').then(resp => {
      // loop through all the animals, and sum the LTB
      let count = 0
      let totalAnimalCount = 0
      for (let i = 0; i < resp.data.length; i++) {
        const animal = resp.data[i]
        totalAnimalCount += animal.countOfTimesSeen
        if (
          animal.species === 'Lion' ||
          animal.species === 'Tiger' ||
          animal.species === 'Bear'
        ) {
          count += animal.countOfTimesSeen
        }
      }
      this.setState({
        animals: resp.data,
        countOfLionsTigersAndBears: count,
        totalAnimalCount: totalAnimalCount
      })
    })
    axios
      .get('https://localhost:5001/api/Animals/location/Jungle')
      .then(resp => {
        //loop through all animals, and return LoLs = Jungle
        this.setState({
          jungleAnimals: resp.data
        })
      })
    axios.delete('https://localhost:5001/api/Animals').then(resp => {
      this.state({
        desertAnimals: resp.data
      })
    })
    axios.get('https://localhost:5001/api/Animals')
  }

  render() {
    return (
      <>
        <h1 className='animals'>Look at All the Animals!!!</h1>
        <ul>
          {this.state.animals.map(animal => {
            return (
              <li key={animal.id}>
                {animal.species}
                {animal.countOfTimesSeen}
                {animal.locationOfLastSeen}
              </li>
            )
          })}
        </ul>
        <h1 className='ligbers'>
          There are {this.state.countOfLionsTigersAndBears} Lions, Tigers, and
          Bears.
        </h1>
        <p>(Oh, My)</p>
        <h1 className='ligbers'>
          There are {this.state.totalAnimalCount} total animals.
        </h1>
        <p>And Mark is cool.</p>
        <h1 className='Jungle'>The Jungle Sure Is Fun</h1>
        <p>Look at the lions, tigers, and cougars!</p>
        <ul>
          {this.state.jungleAnimals.map(jungleAnimals => {
            return (
              <li key={jungleAnimals.id}>
                {jungleAnimals.species}
                {jungleAnimals.countOfTimesSeen}
                {jungleAnimals.locationOfLastSeen}
              </li>
            )
          })}
        </ul>
      </>
    )
  }
}

export default App
