import { Carousel, Image, Button, ButtonGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import styles from './myChart.module.css'
import { updateRating } from "./chartSlice";

function MyCarousel() {

    const list = useSelector((state) => state.chart.albumList)
    const user = useSelector((state) => state.chart.user)
    const dragging = useSelector((state) => state.chart.dragging)
    const dispatch = useDispatch()

    function hideAlbums(x) {
        if (user !== x) {return {visibility: "visible"}} else return {visibility: "hidden", display: "none"}
      }
  

    return ( 
<Carousel slide={false} variant="dark" indicators={false} interval={null} touch={true}>
        {list.map(x =>     
            {
              if((x.rating === null))
                return ( 
            <Carousel.Item style={hideAlbums(x.user)} key={Math.random()} className={styles.MyCarousel}>
              <div>
                <Image id={x.rating} src={x.artLink} className={styles.CarouselArt} alt={x.title}/>
                    <div style={{fontSize: "3vh"}}>
                    <span onClick={() => dispatch(updateRating({newRating: 1, oldObj: x}))}>&#128579;</span>
                    <span>&#x1f44d;</span>
                    <span>&#128054;</span>
                    <span>&#128184;</span>
                    <span>&#128293;</span>
                    <span>&#128175;</span>
                    <h3>{x.title}</h3>
                    <h4>{x.artist}</h4>
                    </div>
                </div>
            </Carousel.Item>
            )
            else return (null)
          })}
    </Carousel>

     );
}

export default MyCarousel;