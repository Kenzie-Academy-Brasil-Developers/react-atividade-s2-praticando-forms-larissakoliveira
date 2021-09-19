
const Card = ({dataForm}) => {
    return (
        <>
        <h3>{dataForm.fullName}</h3>
        <h4>{dataForm.userName}</h4>
        <p>{dataForm.email}</p>
        </>
    )
}

export default Card