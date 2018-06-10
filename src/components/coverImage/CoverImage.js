import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './CoverImage.css';
import {ThemeContext} from '../theme-context';

class CoverImage extends PureComponent {

  render() {
    const {margin, photo} = this.props;

    return (
      <ThemeContext.Consumer>
        {
          theme =>
            <div style={{ margin, width: photo.width, height: photo.height }} className={`imageContainer ${theme.name}`}>
              <img {...photo} alt="cover"/>
              <div className="imageTitle" style={{color: theme.textColor}}>{photo.title}</div>
            </div>
        }
      </ThemeContext.Consumer>
    )
  }
}

CoverImage.propTypes = {
  index: PropTypes.number.isRequired,
  photo: PropTypes.object.isRequired,
  margin: PropTypes.number.isRequired
}

export default CoverImage;