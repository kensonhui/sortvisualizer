import React, { Component } from 'react';
import { Stage, Rect, Layer } from 'react-konva';


class Sorter extends Component {
    state = {
        rectangles: [
            {id: 0, rectProps:{x: 0, width: 50, height: 10}},
            {id: 1, rectProps:{x: 50, width: 50, height: 20}},
            {id: 2, rectProps:{x: 100, width: 50, height: 30}}
        ]
      }
    render() { 
        return ( 
            <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer>
                    {this.state.rectangles.map ( rectangle =>
                        <Rect 
                            x={rectangle.rectProps.x}
                            y={50}
                            width={rectangle.rectProps.width}
                            height={-rectangle.rectProps.height}
                            fill="red"
                            ShadowBlur={10}
                        />
                    )}
                    
                </Layer>
            </Stage>
            
            
         );
    }
}
 
export default Sorter;