import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { filterUser } from './chartSlice';
import styles from './myChart.module.css'

function MyRadio() {

  const dispatch = useDispatch()
  const user = useSelector((state) => state.chart.user)

  function hideSelect() {
    if (user === null) {return {}} else return {display: "none"}
  }

    return ( 
<div style={{textAlign: "center"}}>
<div style={hideSelect()} className={styles.InitialTitle}><span>&#129351;</span><div>Album Club Ranking App</div><span>&#128191;</span></div>
<p style={hideSelect()} className={styles.IntroText}> 
 Have you ever wondered:
 <br />
 <br />
 
"Whose picks in Album Club&#8482; landed most in my Q-zone?"
 <br />
"Does my anectdotal experience align with empirical reality?"
 <br />
"Why would anyone ever half-ass stupid shit?"
 <br />
 <br />
If your answer is yes, your name is AJMA, and you spent two weeks coding a very niche app for your friends!
 <br /> 
 <br />
Pick a user to get started:
 <br />
 <br />
</p>
<Form className={styles.UserChoice}>
<Form.Select size="md" style={hideSelect()} onChange={(e) => dispatch(filterUser(e.target.value))}>
        <option>Select a User</option>
        <option key="1" value="tom">Tom</option>
        <option key="2" value="jill">Jill</option>
        <option key="3" value="ryan">Ryan</option>
        <option key="4" value="rachel">Rachel</option>
        <option key="5" value="ricardo">Ricardo</option>
        <option key="6" value="ajma">AJMA</option>
      </Form.Select>
    </Form>
    <br />
    <p className={styles.IntroText} style={hideSelect()}>You can drag and drop albums into one of six totally positive, completely non-judgmental tiers. 
      <br />If you prefer a more mobile-friendly interface, you can toggle the view type to go one album at a time.
      <br />Remeber to save your ranking as you go in the "Options" menu!
      </p>
    </div>
     );
}

export default MyRadio;