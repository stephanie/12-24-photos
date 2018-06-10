import React, { Component } from 'react';
import './App.css';
import Gallery from 'react-photo-gallery';
import CoverImage from '../coverImage/CoverImage';
import faker from 'faker';
import { themes, ThemeContext } from '../theme-context'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      error: null,
      photos: [],
      theme: themes.light
    }
  }

  changeTheme = (e) => {
    e.preventDefault();

    this.setState((prevState) => ({
      theme: prevState.theme === themes.dark ? themes.light : themes.dark
    }));
  }

  mapPhotos = (photos) => {
    return photos.map(({width, height, urls}) => ({
      width,
      height,
      src: urls && urls.small,
      title: faker.address.country()
    }))
  }

  componentDidMount() {
    const photoApi = 'https://api.unsplash.com/collections/curated/159/photos'
    fetch(photoApi, {
      headers: {
        Authorization: 'Client-ID 500523a36d1e859ed46ef34a588c5991c99f659b804780c0652614b62035207c'
      }
    })
    .then(result => result.json())
    .then(result => {
      this.setState({
        photos: this.mapPhotos(result),
        isLoading: false
      })
    })
    .then(error => {
      this.setState({
        error,
        isLoading: false
      });
    })
  }

  render() {
    return (
      <div className={`App ${this.state.theme.name}`}>
        <ThemeContext.Provider value={this.state.theme}>
          <div className="container">
            <header className="Header">
              <div className="navigation">
                <a href='' className="link">About</a>
                <a href='' onClick={this.changeTheme} className="link" data-locator="theme-link">{this.state.theme.name}</a>
              </div>
              <div className="pageTitle">12 / 24</div>
            </header>
            { !this.state.isLoading &&
            <Gallery photos={this.state.photos} ImageComponent={CoverImage} />
            }
          </div>
        </ThemeContext.Provider>
      </div>
    );
  }
}

export default App;
