import React from 'react'
import Api from '../../utils/Api'

class Info extends React.Component {
    state = {
        users: [],
        filter: [],
        sorted: false,
        search: ""
    }

    componentDidMount() {
        this.loadUsers();
    }

    loadUsers = () => {
        Api.getUsers()
            .then(res => this.setState({ users: res.data.results }))
            .then(res => this.setState({ filter: this.state.users }))
            .then(res => this.setState({ sorted: false }))
    }

    sortTable = (event) => {
        console.log(this.state.sorted)
        let sortArr = this.state.users;
        console.log(sortArr)
        if (this.state.sorted === false) {
            this.setState({ sorted: true })
            sortArr.sort(function (a, b) {
                let nameA = a.name.first.toUpperCase();
                let nameB = b.name.first.toUpperCase();

                if (nameA > nameB) {
                    return 1;
                }
                if (nameA < nameB) {
                    return -1;
                }

                return 0;
            })
        } else {
            this.setState({ sorted: false })
        }

        this.setState({ filter: sortArr })
    }

    handleInputChange = (event) => {
        const value = event.target.value.toLowerCase();
        // console.log(value);
        const filtered = this.state.users.filter(query => query.name.first.toLowerCase().includes(value) || query.name.last.toLowerCase().includes(value) || query.phone.includes(value));
        this.setState({ filter: filtered })
    }

    render() {
        return (
            <>
                <nav className="navbar navbar-dark bg-dark justify-content-center">
                    <form className="form-inline">
                        <input className="form-control mr-sm-2" type="search" onChange={this.handleInputChange} placeholder="Enter a name" />
                    </form>
                </nav>
                <table class="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope="col">Photo</th>
                            <th onClick={this.sortTable} scope="col">Name</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.filter.map(element => (
                                <tr>
                                    <td scope="row"><img src={element.picture.thumbnail} alt="1" /></td>
                                    <td>{element.name.first} {element.name.last}</td>
                                    <td>{element.phone}</td>
                                    <td>{element.email}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </>
        )
    }
}

export default Info; 
