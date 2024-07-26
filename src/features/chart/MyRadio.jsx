import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { filterUser } from './chartSlice';
import styles from './myChart.module.css'

function MyRadio() {

  const dispatch = useDispatch()
  const user = useSelector((state) => state.chart.user)
  const userList = useSelector((state) => state.chart.userList)

  function hideSelect() {
    if (user === null) {return {}} else return {display: "none"}
  }

    return ( 
<div style={{textAlign: "center"}}>
<div style={hideSelect()} className={styles.InitialTitle}><span>&#129351;</span><div>Album Club Ranking App</div><span>&#128191;</span></div>
<p style={hideSelect()} className={styles.IntroText}> 
 <b>Have you ever wondered:</b>
 <br />
 <br />
 
<i>Whose picks in Album Club&#8482; landed most in my Q-zone?</i>
 <br />
 <i>Does my anectdotal experience align with empirical reality?</i>
 <br />
 <i>Why would anyone ever half-ass stupid shit?</i>
 <br />
 <br />
If your answer is yes, your name is AJMA, and you spent two weeks coding a very niche app for your friends!
 <br /> 
 <br /> 
<b>*****</b>
<br /> 
<br /> 
You can drag and drop albums into one of six totally positive, completely non-judgmental tiers. 
      <br /><br /> If you prefer a more mobile-friendly interface, you can toggle the view type to go one album at a time.
      <br /><br /> Remeber to save your ranking as you go in the "Options" menu!
      <br /> <br /> 
</p>

<Form className={styles.UserChoice}>
<Form.Select size="md" style={hideSelect()} onChange={(e) => dispatch(filterUser(e.target.value))}>
        <option>Select a User to Begin</option>
        {userList.map((x) => (<option key={Math.random()} value={x} style={{textTransform: "capitalize"}}>{x}</option>))}
      </Form.Select>
    </Form>
    <br />

    </div>
     );
}

export default MyRadio;