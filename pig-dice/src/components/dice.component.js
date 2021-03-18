import './dice.css';
import React from 'react';

class Dice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentValue: props.value
        }
    }

    roll = () => {
        var xRand = getRandom(max, min);
        var yRand = getRandom(max, min);
          
        cube.style.webkitTransform = 'rotateX('+xRand+'deg) rotateY('+yRand+'deg)';
        cube.style.transform = 'rotateX('+xRand+'deg) rotateY('+yRand+'deg)';
    }

    render() {
        return (
            <section class="cubeContainer">
                <div id="cube">
                    <div class="front">
                        <span class="dot dot1"></span>
                    </div>
                    <div class="back">
                        <span class="dot dot1"></span>
                        <span class="dot dot2"></span>
                    </div>
                    <div class="right">
                        <span class="dot dot1"></span>
                        <span class="dot dot2"></span>
                        <span class="dot dot3"></span>
                    </div>
                    <div class="left">
                        <span class="dot dot1"></span>
                        <span class="dot dot2"></span>
                        <span class="dot dot3"></span>
                        <span class="dot dot4"></span>
                    </div>
                    <div class="top">
                        <span class="dot dot1"></span>
                        <span class="dot dot2"></span>
                        <span class="dot dot3"></span>
                        <span class="dot dot4"></span>
                        <span class="dot dot5"></span>
                    </div>
                    <div class="bottom">
                        <span class="dot dot1"></span>
                        <span class="dot dot2"></span>
                        <span class="dot dot3"></span>
                        <span class="dot dot4"></span>
                        <span class="dot dot5"></span>
                        <span class="dot dot6"></span>
                    </div>
                </div>
            </section>
        )
    }
}

export default Dice;