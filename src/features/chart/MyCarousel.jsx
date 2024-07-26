import { Carousel, Image, Button, ButtonGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import styles from './myChart.module.css'
import { updateRating } from "./chartSlice";

function MyCarousel() {

    const list = useSelector((state) => state.chart.albumList)
    const user = useSelector((state) => state.chart.user)
    const showCarousel = useSelector((state) => state.chart.showCarousel)
    const dispatch = useDispatch()

    function hideAlbums(x) {
        if (user !== x) {return {visibility: "visible"}} else return {visibility: "hidden", display: "none"}
      }

    function myFilter() {
      return list.filter((x) => ((x.user !== user) && (x.rating === null)))
    }

    function show() {
      if ((showCarousel === true)) {return {visibility: "visible"}} else return {visibility: "hidden", display: "none"}
    }

    return ( 
<Carousel style={show()} slide={false} variant="dark" indicators={false} interval={null} touch={true}>
        {myFilter().map(x =>     

            (<Carousel.Item style={hideAlbums(x.user)} key={Math.random()} className={styles.MyCarousel}>
              <div>
                <Image id={x.rating} src={x.artLink} className={styles.CarouselArt} alt={x.title}/>
                    <div style={{fontSize: "3vh"}}>
                  <ButtonGroup style={{outline:"1px solid black"}}>
                    <Button variant="light" onClick={() => dispatch(updateRating({newRating: 1, oldObj: x}))}>&#128579;</Button>
                    <Button variant="light" onClick={() => dispatch(updateRating({newRating: 2, oldObj: x}))}>&#x1f44d;</Button>
                    <Button variant="light" onClick={() => dispatch(updateRating({newRating: 3, oldObj: x}))}>&#128054;</Button>
                    <Button variant="light" onClick={() => dispatch(updateRating({newRating: 4, oldObj: x}))}>&#128184;</Button>
                    <Button variant="light" onClick={() => dispatch(updateRating({newRating: 5, oldObj: x}))}>&#128293;</Button>
                    <Button variant="light" onClick={() => dispatch(updateRating({newRating: 6, oldObj: x}))}>&#128175;</Button>
                  </ButtonGroup>
                    <h3>{x.title}</h3>
                    <h4>{x.artist}</h4>
                    </div>
                </div>
            </Carousel.Item>)

          )}
    </Carousel>

     );
}

export default MyCarousel;