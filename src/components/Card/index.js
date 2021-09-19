
const Card = ({dataForm}) => {
    return (
        <>
        <h5>{dataForm.fullName}</h5>
        <p>{dataForm.userName}</p>
        <p>{dataForm.email}</p>
        </>
    )
}

export default Card