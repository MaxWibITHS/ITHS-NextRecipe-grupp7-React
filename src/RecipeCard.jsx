import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './RecipeCard.css';



function RecipeCard({id, image, title, servings, readyInMinutes}) {
  return (
    <div className='card-container'>
    <Card key={id} style={{ width: '25rem' }} >
      <Card.Img variant="top" src={image}  className='card-image'/>
      <Card.Body>
        <Card.Title className='card-title'>{title}</Card.Title>
        <Card.Text className='card-text'>
         Servings: {servings}
         <br/>
         Ready in minutes: {readyInMinutes}
        </Card.Text>
        <Button variant="primary" className='card-button'>View Recipe</Button>
      </Card.Body>
    </Card>
    </div>
  );
}

export default RecipeCard;

