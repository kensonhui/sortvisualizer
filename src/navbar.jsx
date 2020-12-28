import React, { Component } from 'react';

class NavBar extends Component {
    state = {  }
    render() { 
        return ( 
            <nav class="navbar navbar-light bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Navbar</a>
                </div>
                <span className="badge badge-pill badge-secondary">
                </span>
            </nav>
         );
    }
}
 
export default NavBar;