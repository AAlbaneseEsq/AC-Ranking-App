import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Image } from 'react-bootstrap';
import { updateRating,dragStart } from './chartSlice';

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
      var rating = parseInt(e.target.className)
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
  

            <Image src={x.artLink} width="100px" height="100px" alt={x.title} draggable onDrag={(e) => handleDragStart(e, x)} onDragStart={(e) => myDrag(e)} key={Math.random()}/>
     
          )
          else return (null)
        }
        )
    )
    }


return (
<div style={hideChart()}>
<Container fluid style={{outline: "black solid 2px", margin: "auto"}}>
<Row style={{minHeight: "100px"}}>
  <Col xs={2} style={{outline: "black solid 1px", fontSize: "2vmax", alignContent: "center"}} >&#128175; Holy Moly</Col>
  <Col style={{outline: "black solid 1px", padding: "20px"}} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e)} className="6"> {generateContent(list, 6)} </Col>
</Row>
<Row style={{minHeight: "100px"}}>
  <Col xs={2} style={{outline: "black solid 1px", fontSize: "2vmax", alignContent: "center"}} >&#128293; Straight Fire</Col>
  <Col style={{outline: "black solid 1px", padding: "20px"}} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e)} className="5"> {generateContent(list, 5)} </Col>
</Row>
<Row style={{minHeight: "100px"}}>
  <Col xs={2} style={{outline: "black solid 1px", fontSize: "2vmax", alignContent: "center"}}>&#128184; Cash Money</Col>
  <Col style={{outline: "black solid 1px", padding: "20px"}} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e)} className="4"> {generateContent(list, 4)}</Col>
</Row>
<Row style={{minHeight: "100px"}}>
  <Col xs={2} style={{outline: "black solid 1px", fontSize: "2vmax", alignContent: "center"}}>&#128054; Much waow, very good</Col>
  <Col style={{outline: "black solid 1px", padding: "20px"}} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e)} className="3"> {generateContent(list, 3)}</Col>
</Row>
<Row style={{minHeight: "100px"}}>
  <Col xs={2} style={{outline: "black solid 1px", fontSize: "2vmax", alignContent: "center"}}>&#9994; Respect</Col>
  <Col style={{outline: "black solid 1px", padding: "20px"}} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e)} className="2"> {generateContent(list, 2)}</Col>
</Row>
<Row style={{minHeight: "100px"}}>
  <Col xs={2} style={{outline: "black solid 1px", fontSize: "2vmax", alignContent: "center"}}> &#128579; It was fine!!!</Col>
  <Col style={{outline: "black solid 1px", padding: "20px"}} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e)} className="1">{generateContent(list, 1)}</Col>
</Row>
</Container>
  <div onDragOver={handleDragOver} onDrop={(e) => handleDrop(e)} className="null" style={{marginTop: "50px", marginBottom: "25px"}} >
    {list.map(x =>     
    {
      if((x.rating === null))
        return ( 
      <div style={hideAlbums(x.user)} key={Math.random()}>

      <Image src={x.artLink} width="100px" height="100px" alt={x.title} draggable onDrag={(e) => handleDragStart(e, x)} onDragStart={(e) => myDrag(e)} onDrop={(e) => handleDrop(e)} title={x.artist + ': ' + x.title} />
      <span className="tooltip"></span>


    </div>
    )
    else return (null)
  })}
  </div>
</div>
  );
}