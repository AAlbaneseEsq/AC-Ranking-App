import { Modal, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { closeResults } from "./chartSlice";
import styles from './myChart.module.css'

function Results() {

    const renderResults = useSelector((state) => state.chart.renderResults)
    const scores = useSelector((state) => state.chart.scores)
    const currentUser = useSelector((state) => state.chart.user)
    const dispatch = useDispatch()


    return ( 
<Modal
      show={renderResults}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter" className={styles.ResultsTitle}>
          Here are your results!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{textAlign: "center"}}>
        {scores.map((x) => {
        if (x.user !== currentUser)
            return (<div className={styles.ResultsText} key={Math.random()}><span style={{textTransform: "capitalize"}}>{x.user}:</span> {x.userScore.toFixed(1)}%</div>) 
        else return (null) 
        })}
        </div>
      </Modal.Body>
      <Modal.Footer style={{margin: "auto"}}>
      <Button onClick={() => dispatch(closeResults())} >Return to Ranking</Button> 
      <Button>Share Results (TBD)</Button> 
      <Button  onClick={() => window.location.reload()}>Reset App</Button>
      </Modal.Footer>
    </Modal>
     );
}

export default Results;