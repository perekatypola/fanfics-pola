import React from "react";

class  Authors extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {}

    render() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="navbar-nav mr-auto">
                    <div className="nav-item">
                        <a className="nav-link" href="/users">авторы</a>
                    </div>
                    <div className="nav-item">
                        <a className="nav-link" href="/works">фанфики</a>
                    </div>
                    <form className="form mr-auto">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-primary" type="submit">Search</button>
                    </form>
                </div>
                <button className="btn btn-outline-primary sign-up" type="submit">Sign Up</button>
            </nav>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>"Гарри Поттер"</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}
}

export default Authors;