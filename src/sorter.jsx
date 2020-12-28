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

    addRect = () => {
        const rects = this.state.rectangles;
        const lastrect = rects[rects.length - 1];
        console.log(lastrect)


        this.setState({
            rectangles: rects.concat(
                {id: lastrect.id + 1, 
                    rectProps:{
                        x: lastrect.rectProps.x + lastrect.rectProps.width,
                         width: 50, 
                         height: lastrect.rectProps.height + 10}})
        });
        
        
    }

    scaleRects = () => {
        
        const newWidth = Math.round(window.innerWidth / this.state.rectangles.length);
        const rectangles = this.state.rectangles.map(rectangle => {
            rectangle.width = newWidth;
            return rectangle;
        });

        this.setState({ rectangles })
        
    }
    

    render() { 

        return ( 
            <React.Fragment>
                <span>Elements to sort: {this.state.rectangles.length}</span>
                <button onClick={this.addRect}>Add element</button>
                <button onClick={this.scaleRects}>Scale Rects</button>
                <Stage width={window.innerWidth} height={window.innerHeight}>
                    <Layer>
                        {this.state.rectangles.map ( rectangle =>
                            <Rect 
                                x={rectangle.rectProps.x}
                                y={100}
                                key={rectangle.rectProps.id}
                                width={rectangle.rectProps.width}
                                height={-rectangle.rectProps.height}
                                fill="red"
                                ShadowBlur={10}
                            />
                        )}
                        
                    </Layer>
                </Stage>


            </React.Fragment>
            
            
            
         );
    }
}
 
export default Sorter;