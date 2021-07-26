import React,{useState} from 'react'
import LoaderJosn from './LetsEat-Final Loader.json'
import Lottie from 'react-lottie';
function LoadingSpinner() {

    const [isStopped]=useState(false)
    const [isPaused]=useState(false)
    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData:LoaderJosn,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };
    return (
        <div className="loader" >
            <Lottie options={defaultOptions}
              height={100}
              width={100}
              isStopped={isStopped}
              isPaused={isPaused}/>
        </div>
           
    )
}

export default LoadingSpinner
