import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { submitData2, resetData, handleError, getRandom, saveLocal, getLocal, handleWarning } from "./chartSlice";
import { Modal, Dropdown } from "react-bootstrap";
import styles from "./myChart.module.css"

function Submit() {

    const list = useSelector((state) => state.chart.albumList)
    const user = useSelector((state) => state.chart.user)
    const error = useSelector((state) => state.chart.error)
    const warning = useSelector((state) => state.chart.warning)


    const dispatch = useDispatch()

    function validation() {
        var test = true
        for (let i = 0; i < list.length; i++)
            if ((list[i].user !== user) && (list[i].rating === null)) return (test = false); else return (test = true)
        return test
    }

    function submitForm() {
        if (validation() === true) return (dispatch(submitData2())); else return (dispatch(handleError(true)))
    }

    function hideChart() {
        if (user !== null) {return {}} else return {display: "none"}
      }

    


    return ( 
    
    <div> 
      <div style={hideChart()} className={styles.ButtonsDiv}>
      <Dropdown>
      <Dropdown.Toggle id="dropdown-basic" className={styles.ButtonLeft}>
        Options
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1" onClick={() => dispatch(resetData())}>Reset Rankings</Dropdown.Item>
        <Dropdown.Item href="#/action-2" onClick={() => dispatch(getRandom())} >Random Ranking</Dropdown.Item>
        <Dropdown.Item href="#/action-3" onClick={() => dispatch(getLocal())}>Load Saved Ranking</Dropdown.Item>
        <Dropdown.Item href="#/action-4" onClick={() => dispatch(handleWarning(true))}>Save Current Ranking</Dropdown.Item>
      </Dropdown.Menu>
      </Dropdown>
      <div className={styles.TopNavTitle}>{user}'s Album Club Ranking</div>
      <Button className={styles.ButtonRight} onClick={() => submitForm()} >Get Results</Button>
      </div>

      

    <Modal
      show={error}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter" style={{margin: "auto"}}>
          Please finish your ranking!
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button onClick={() => dispatch(handleError(false))} style={{margin: "auto"}}>Close</Button>
      </Modal.Footer>
    </Modal>

    <Modal
      show={warning}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter" style={{margin: "auto"}}>
          Warning!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{textAlign: "center"}}>
        Saving this ranking will overwrite any previous saved data. 
        <br />
        Erasing your browser cookies/cache will also delete your ranking.
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => dispatch(handleWarning(false))} style={{margin: "auto"}}>Cancel</Button>
        <Button onClick={() => dispatch(saveLocal())} style={{margin: "auto"}}>Continue with Save</Button>
      </Modal.Footer>
    </Modal>
        
        
    </div>
     );
}

export default Submit;