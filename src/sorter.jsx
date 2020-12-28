import React, { Component } from 'react';
import { Stage, Rect, Layer } from 'react-konva';


class Sorter extends Component {
    state = {
        rectangles: [
            {id: 0, rectProps:{ref: React.createRef(), pos: 0, x: 0, width: 50, height: 10}},
            {id: 1, rectProps:{ref: React.createRef(), x: 50, width: 50, height: 20}},
            {id: 2, rectProps:{ref: React.createRef(), x: 100, width: 50, height: 30}}
        ]
      }

    addRect = () => {
        const rects = this.state.rectangles;
        const lastrect = rects[rects.length - 1];

        this.setState({
            rectangles: rects.concat(
                {id: lastrect.id + 1, 
                    rectProps:{
                        ref: React.createRef(),
                        x: lastrect.rectProps.x + lastrect.rectProps.width,
                        width: lastrect.rectProps.width, 
                        height: lastrect.rectProps.height + 10}})
        }, this.scaleRects);

    }

    scaleRects = () => {
        
        const ratio = window.innerWidth / (this.state.rectangles.length * this.state.rectangles[0].rectProps.width);
        const rectangles = this.state.rectangles.map(rectangle => {
            
            rectangle.rectProps.ref.current.to({
                scaleX: ratio,
                x: rectangle.rectProps.width * ratio * rectangle.id
            });
            rectangle.width = rectangle.rectProps.ref.current.attrs.width * ratio;
            return rectangle;
        });
    }



    

    render() { 

        return ( 
            <React.Fragment>
                <span>Elements to sort: {this.state.rectangles.length}</span>
                <button onClick={this.addRect}>Add element</button>
                <button onClick={this.scaleRects}>Scale Rects</button>
                <Stage key="stage" width={window.innerWidth} height={window.innerHeight}>
                    <Layer>
                        {this.state.rectangles.map ( rectangle =>
                            <Rect 
                                ref={rectangle.rectProps.ref}
                                x={rectangle.rectProps.x}
                                y={120}
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