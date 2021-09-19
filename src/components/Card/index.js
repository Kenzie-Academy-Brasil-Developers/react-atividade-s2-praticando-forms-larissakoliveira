// import { Link } from 'react-router-dom'
const Card = ({dataForm}) => {
    return (
        <>
        {/* // <Link path='/cadastro'> */}
        <h5>{dataForm.fullName}</h5>
        <p>{dataForm.userName}</p>
        <p>{dataForm.email}</p>
        {/* </Link> */}
        </>
    )
}

export default Card