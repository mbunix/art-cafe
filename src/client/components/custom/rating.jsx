import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar ,faStarHalfAlt} from '@fortawesome/free-solid-svg-icons'

const Rating = ({ value, text, color }) => {
  return (
    <div className='rating'>
      <span>
        <i
          style={{ color }}
          className={
            value >= 1
             ? <FontAwesomeIcon icon={faStar} />
                : value >= 0.5
             ? <FontAwesomeIcon icon={faStarHalfAlt} />
            : 'far fa-star-half-alt'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            value >= 2 ? (
  <FontAwesomeIcon icon={faStar} />
) : value >= 1.5 ? (
  <FontAwesomeIcon icon={faStarHalfAlt} />
) : (
  'far fa-star-half-alt'
)
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            value >= 3 ? (
  <FontAwesomeIcon icon={faStar} />
) : value >= 2.5 ? (
  <FontAwesomeIcon icon={faStarHalfAlt} />
) : (
  'far fa-star-half-alt'
)

          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            value >= 4? (
  <FontAwesomeIcon icon={faStar} />
) : value >= 3.5 ? (
  <FontAwesomeIcon icon={faStarHalfAlt} />
) : (
  'far fa-star-half-alt'
)

          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
          value >= 5 ? (
  <FontAwesomeIcon icon={faStar} />
) : value >= 4.5 ? (
  <FontAwesomeIcon icon={faStarHalfAlt} />
) : (
  'far fa-star-half-alt'
)
          }
        ></i>
      </span>
      <span>{text && text}</span>
    </div>
  )
}

Rating.defaultProps = {
  color: '#f8e825'
}

export default Rating
