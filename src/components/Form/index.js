import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import Card from '../Card'
import {Switch, Route, Link} from 'react-router-dom';


const Form = () => {

    const formSchema = yup.object().shape({
        userName: yup.string().required('Nome de usuário obrigatório'),
        fullName: yup.string().required('Nome completo obrigatório').matches(/^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/, 'Deve conter ao menos um segundo nome, nao pode conter numeros'),
        email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
        emailConfirm: yup.string().oneOf([yup.ref('email')], 'Emails diferentes').required('Confirmação de email obrigatória'),
        password: yup.string().min(8, 'Minimo 8 caracteres').required('Senha obrigatória').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/,'Senha deve conter ao menos uma letra maiúscula, uma minúscula, um número e um caracter especial.'),
        confirmPassword: yup.string().oneOf([yup.ref('password')], 'Senhas diferentes').required('Confirmação de senha obrigatória'),
        checkbox: yup.boolean().oneOf([true], 'Os termos de condicao devem ser aceitos'),
          });
    

    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(formSchema)
    });

    const handleMyForm = (data) => console.log(data)
    
    return(
        <form className='form' onSubmit={handleSubmit(handleMyForm)}>
            <input placeholder='Nome de usuário*' {...register('userName')}/>
            { errors.userName?.message && <h4>{errors.userName?.message}</h4>}
            <input placeholder='Nome completo*' {...register('fullName')}/>
            { errors.fullName?.message && <h4>{errors.fullName?.message}</h4>}
            <input placeholder='Endereço de Email' {...register('email')}/>
            { errors.email?.message && <h4>{errors.email?.message}</h4>}
            <input placeholder='Confirme seu Email' {...register('emailConfirm ')}/>
            { errors.emailConfirm?.message && <h4>{errors.emailConfirm?.message}</h4>}
            <input placeholder='Senha' {...register('password')}/>
            { errors.password?.message && <h4>{errors.password?.message}</h4>}
            <input placeholder='Confirme a senha' {...register('confirmPassword')}/>
            { errors.confirmPassword?.message && <h4>{errors.confirmPassword?.message}</h4>}
            <div className='checkbox' {...register('checkbox')}>
            <input id='checkbox' type='checkbox' {...register('checkbox')}/>
            <label for='checkbox'> Eu aceito os termos de uso de aplicação </label>
            { errors.checkbox?.message && <h4>{errors.checkbox?.message}</h4>}
            </div>
            <Link to='/cadastro'> <button type='submit'>Cadastrar</button></Link>
            <Link to='/'>Já possui uma conta?</Link>
            <Switch>
                <Route path='/cadastro'>
                    <Card handleMyForm={handleMyForm}/>
                </Route>
            </Switch>
        </form>
    )
}

export default Form