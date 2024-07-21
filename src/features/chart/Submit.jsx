import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { submitData2, resetData, handleError, getRandom, saveLocal, getLocal } from "./chartSlice";
import { Modal } from "react-bootstrap";

function Submit() {

    const list = useSelector((state) => state.chart.albumList)
    const user = useSelector((state) => state.chart.user)
    const error = useSelector((state) => state.chart.error)

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
        <div style={hideChart()}>
            <Button style={{margin: "5px"}} onClick={() => dispatch(getRandom())}>Random Ranking (Delete After Testing)</Button>
            <Button style={{margin: "5px"}} onClick={() => dispatch(resetData())}>Reset Ratings</Button>
            <Button style={{margin: "5px"}} onClick={() => dispatch(getLocal())}>Get Previous Rankings</Button>
            <Button style={{margin: "5px"}} onClick={() => dispatch(saveLocal())}>Save Rankings</Button>
            <Button style={{margin: "5px"}} onClick={() => submitForm()}>Get Results</Button>
        
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
        
        
    </div>
     );
}

export default Submit;