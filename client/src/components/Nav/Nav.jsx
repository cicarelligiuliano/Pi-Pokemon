import React from "react";
import { Link } from "react-router-dom";

const Nav = (props) => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <br />
      <Link to="/pokemon/create">Create Pokemon</Link>
    </nav>
  );
};

// class Nav extends Component {
//   render() {
//     return (
//       <div>
//         <Link to="/">Home</Link>
//         <br />
//         <Link to="/house/create">Create House</Link>
//       </div>
//     );
//   }
// }

export default Nav;
