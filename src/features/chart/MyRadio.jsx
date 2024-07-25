import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { filterUser } from './chartSlice';
import styles from './myChart.module.css'

function MyRadio() {

  const dispatch = useDispatch()
  const user = useSelector((state) => state.chart.user)

  function hideSelect() {
    if (user === null) {return {width: "50%", margin: "auto"}} else return {display: "none"}
  }

    return ( 
<Form>
 <div style={hideSelect()} className={styles.TopNavTitle}>&#128191; Album Club Ranking App &#128191;</div>
<Form.Select className={styles.UserChoice} size="md" style={hideSelect()} onChange={(e) => dispatch(filterUser(e.target.value))}>
        <option>Select a User</option>
        <option key="1" value="tom">Tom</option>
        <option key="2" value="jill">Jill</option>
        <option key="3" value="ryan">Ryan</option>
        <option key="4" value="rachel">Rachel</option>
        <option key="5" value="ricardo">Ricardo</option>
        <option key="6" value="ajma">AJMA</option>
      </Form.Select>
    </Form>
     );
}

export default MyRadio;