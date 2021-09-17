import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import Card from '../Card'


const Form = () => {

    const formSchema = yup.object().shape({
        userName: yup.string().required('Nome de usuário obrigatório').matches(),
        fullName: yup.string().required('Nome completo obrigatório'),
        email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
        emailConfirm: yup.string().oneOf([yup.ref('email')], 'Emails diferentes'),
        password: yup.string().required('Senha obrigatória'),
        confirmPassword: yup.string().required('Confirmação de senha obrigatória')
    })

    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(formSchema)
    });

    const handleMyForm = (data) => console.log(data)

    return(
        <form className='form' onSubmit={handleSubmit(handleMyForm)}>
            <input placeholder='Nome de usuário*' {...register('userName')}/>
            { errors.userName?.message && <h4>{errors.userName?.message}</h4>}
            <input placeholder='Nome completo*' {...register('fullName')}/>
            { errors.fullName?.message }
            <input placeholder='Endereço de Email' {...register('email')}/>
            { errors.email?.message }
            <input placeholder='Confirme seu Email' {...register('emailConfirm ')}/>
            { errors.emailConfirm?.message }
            <input placeholder='Senha' {...register('password')}/>
            { errors.password?.message }
            <input placeholder='Confirme a senha' {...register('confirmPassword')}/>
            { errors.confirmPassword?.message }
            <label for='checkbox'> Eu aceito os termos de uso de aplicação </label>
            <input id='checkbox' type='checkbox'/>
           
            <button type='submit'>Enviar</button>
            <p src='/'>Já possui uma conta?</p>
            <Card />
        </form>
    )
}

export default Form