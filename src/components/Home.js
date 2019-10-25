import React, { Component } from 'react';
import axios from 'axios';

export class Home extends Component {
    constructor(props) {
        super(props);
      }
    componentDidMount(){
        if (window.localStorage.token){
            if(window.localStorage.role === 'supplier'){
                axios({
                    method: 'get',
                    url: `https://shielded-fjord-25564.herokuapp.com/api/supplier/current`,
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Token ${window.localStorage.token}`
                    },
                  }).then(res => {
                    const data = {
                        "company_name": res.data.user.company_name,
                        "abn": res.data.user.abn,
                        "email": res.data.user.email,
                        "phone": res.data.user.phone,
                        "street": res.data.user.street,
                        "suburb": res.data.user.suburb,
                        "state": res.data.user.state
                    }
    
                    const path = {
                        pathname: '/sup-profile',
                        state: data,
                    }
                    // console.log(this.props)
                    this.props.history.push(path)
                    })
                    .catch(err => {
                      console.log(err)
                    });
            }else if (window.localStorage.role === 'gov'){
                axios({
                    method: 'get',
                    url: `https://shielded-fjord-25564.herokuapp.com/api/gov/current`,
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Token ${window.localStorage.token}`
                    },
                  }).then(res => {
                    const data = {
                        "abn": res.data.user.abn,
                        "company_name": res.data.user.company_name,
                        "activity_type": res.data.user.activity_type,
                        "role": res.data.user.role
                    }
    
                    const path = {
                        pathname: '/gov',
                        state: data,
                    }
                    this.props.history.push(path)
                    })
                    .catch(err => {
                      console.log(err)
                    });
            }else{
                axios({
                    method: 'get',
                    url: `https://shielded-fjord-25564.herokuapp.com/api/verifier/current`,
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Token ${window.localStorage.token}`
                    },
                  }).then(res => {
                    const data = {
                        "abn": res.data.user.abn,
                        "company_name": res.data.user.company_name,
                        "activity_type": res.data.user.activity_type,
                        "role": res.data.user.role
                    }

                    const path = {
                        pathname: '/ver-profile',
                        state: data,
                    }
                    this.props.history.push(path)
                  }).catch((err) => {
                    console.log(err.response)
                  });
            }
            
        }else{
            this.props.history.push('/login')
        }
        
    }
    
    render() {
        return (
            <div>
            </div>
        )
    }
}

export default Home
