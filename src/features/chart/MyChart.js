import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, ButtonGroup, Image } from 'react-bootstrap';
import { updateRating,dragStart } from './chartSlice';
import styles from './myChart.module.css'

export function MyChart() {

    const list = useSelector((state) => state.chart.albumList)
    const user = useSelector((state) => state.chart.user)
    const dragging = useSelector((state) => state.chart.dragging)
    const dispatch = useDispatch()

    const handleDragOver = (e) => {
      e.preventDefault();
    }

    const handleDragStart = (e, x) => {
      dispatch(dragStart(x))
    };

    const myDrag = (e) => {
      e.dataTransfer.setData('Text', 'My String');
    };

    const handleDrop = (e) => {
      e.preventDefault();
      var rating = parseInt(e.target.id)
      var adj = (rating > 0) ? rating : null
      var data = dragging
      dispatch(updateRating({newRating: adj, oldObj: data}))
      ;
    };

    function hideChart() {
      if (user !== null) {return {}} else return {display: "none"}
    }

    function hideAlbums(x) {
      if (user !== x) {return {visibility: "visible", display: "inline-block"}} else return {visibility: "hidden", display: "none"}
    }

    function generateContent(data, row) {
    return(
          data.map(x => {
            if(x.rating === row)
              return (    
            <Image id={x.rating} src={x.artLink} className={styles.Art} alt={x.title} draggable onDrag={(e) => handleDragStart(e, x)} onDragStart={(e) => myDrag(e)} key={Math.random()} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e)}/>
          )
          else return (null)
        }
        )
    )
    }


return (
<div style={hideChart()}>
<Container fluid className={styles.Chart}>
<Row className={styles.Row}>
  <Col className={styles.Category} xs={2}>&#128175;<br />Holy Moly</Col>
  <Col className={styles.Ranking} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e)} id="6"> {generateContent(list, 6)} </Col>
</Row>
<Row className={styles.Row}>
  <Col className={styles.Category} xs={2}>&#128293;<br />Straight Fire</Col>
  <Col className={styles.Ranking} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e)} id="5"> {generateContent(list, 5)} </Col>
</Row>
<Row className={styles.Row}>
  <Col className={styles.Category} xs={2}>&#128184;<br />Cash Money</Col>
  <Col className={styles.Ranking} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e)} id="4"> {generateContent(list, 4)}</Col>
</Row>
<Row className={styles.Row}>
  <Col className={styles.Category} xs={2}>&#128054;<br />Much waow, very good</Col>
  <Col className={styles.Ranking} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e)} id="3"> {generateContent(list, 3)}</Col>
</Row>
<Row className={styles.Row}>
  <Col className={styles.Category} xs={2}>&#x1f44d;<br />Respect It</Col>
  <Col className={styles.Ranking} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e)} id="2"> {generateContent(list, 2)}</Col>
</Row>
<Row  className={styles.Row}>
  <Col className={styles.Category} xs={2}>&#128579;<br />It's fine!!!</Col>
  <Col className={styles.Ranking} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e)} id="1">{generateContent(list, 1)}</Col>
</Row>
</Container>
<div className={styles.ViewButtons}>
<ButtonGroup>
  <Button disabled>View Type:</Button>
  <Button>A</Button>
  <Button>B</Button>
</ButtonGroup>
</div>
  <div className={styles.Null} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e)} id="null">
    {list.map(x =>     
    {
      if((x.rating === null))
        return ( 
      <div style={hideAlbums(x.user)} key={Math.random()}>
      <Image id={x.rating} src={x.artLink} className={styles.Art} alt={x.title} draggable onDrag={(e) => handleDragStart(e, x)} onDragStart={(e) => myDrag(e)} onDrop={(e) => handleDrop(e)} title={x.artist + ': ' + x.title} onDragOver={handleDragOver}/>
      <span className="tooltip"></span>
    </div>
    )
    else return (null)
  })}
  </div>
</div>
  );
}