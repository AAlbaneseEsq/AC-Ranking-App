import { Modal, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { closeResults } from "./chartSlice";
import styles from './myChart.module.css'

function Results() {

    const renderResults = useSelector((state) => state.chart.renderResults)
    const scores = useSelector((state) => state.chart.scores)
    const currentUser = useSelector((state) => state.chart.user)
    const dispatch = useDispatch()

    function scoreCSS(x) {
      if (x > 66) return {color: "green"}; 
      else if ((x < 66) && (x > 33)) return {color: "orange"}; 
      else return {color: "red"}
    }

    function myCopy() {
      var myStringArray = scores.map((x) => ' ' + x.user + ': ' + x.userScore.toFixed(1) + '%' )
      var myString = myStringArray.toString()
      navigator.clipboard.writeText(myString.toUpperCase());
    }


    return ( 
<Modal
      show={renderResults}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter" style={{margin: "auto", fontSize: "2.5vmax"}}>
          <b><span style={{textTransform: "capitalize"}}>{currentUser}'s</span> Results</b>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{textAlign: "center"}} id="resultsText">
        {scores.map((x) => {
        if (x.user !== currentUser)
            return (<div className={styles.ResultsText} key={Math.random()}><span style={{textTransform: "capitalize"}}><b>{x.user}:</b> </span><span style={scoreCSS(x.userScore)}>{x.userScore.toFixed(1)}%</span></div>) 
        else return (null) 
        })}
        </div>
      </Modal.Body>
      <Modal.Footer style={{margin: "auto"}}>
      <Button className={styles.ResultsButton} onClick={() => dispatch(closeResults())} >Return to Ranking</Button> 
      <Button className={styles.ResultsButton} onClick={() => myCopy()}>Copy to Clipboard</Button>
      <Button className={styles.ResultsButton} onClick={() => window.location.reload()}>Reset App</Button>
      </Modal.Footer>
    </Modal>
     );
}

export default Results;