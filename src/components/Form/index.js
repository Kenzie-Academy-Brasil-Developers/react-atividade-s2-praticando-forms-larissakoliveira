import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Card from "../Card";
import { Link } from "react-router-dom";
import { useState } from "react";

const Form = () => {

    const [dataForm, setDataForm] = useState([]);
 
    const formSchema = yup.object().shape({
        userName: yup.string().required("Nome de usuário obrigatório"),
        fullName: yup
            .string()
            .required("Nome completo obrigatório")
            .matches(
                /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/,
                "Deve nome completo, nao pode conter numeros"
            ),
        email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
        emailConfirm: yup
        .string().required('email obrigatorio').email('E-mail inválido').oneOf([yup.ref('email')], 'emails devem ser iguais'),
        password: yup
            .string()
            .min(8, "Minimo 8 caracteres")
            .required("Senha obrigatória")
            .matches(
                /(?=^.{8,}$)((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/g,
                "Senha deve conter ao menos uma letra maiúscula, uma minúscula, um número e um caracter especial."
            ),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref("password")], "Senhas diferentes")
            .required("Confirmação de senha obrigatória"),
        acceptTerms: yup
            .boolean()
            .oneOf([true], "Os termos de condicao devem ser aceitos"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(formSchema),
    });

    const handleMyForm = (data) => {
        setDataForm(data);
    };

    return (
        <form className="form" onSubmit={handleSubmit(handleMyForm)}>
            <input
                type="text"
                placeholder="Nome de usuário*"
                {...register("userName")}
            />
            {errors.userName?.message && <h4>{errors.userName?.message}</h4>}
            <input
                type="text"
                placeholder="Nome completo*"
                {...register("fullName")}
            />
            {errors.fullName?.message && <h4>{errors.fullName?.message}</h4>}
            <input
                placeholder="Endereço de Email"
                {...register("email")}
            />
            {errors.email?.message && <h4>{errors.email?.message}</h4>}
            <input
                placeholder="Confirme seu Email"
                {...register("emailConfirm")}
            />
            {errors.emailConfirm?.message && <h4>{errors.emailConfirm?.message}</h4>}
            <input type="password" placeholder="Senha" {...register("password")} />
            {errors.password?.message && <h4>{errors.password?.message}</h4>}
            <input
                type="password"
                placeholder="Confirme a senha"
                {...register("confirmPassword")}
            />
            {errors.confirmPassword?.message && (
                <h4>{errors.confirmPassword?.message}</h4>
            )}
            <div className="acceptTerms" {...register("acceptTerms")}>
                <input id="acceptTerms" type="checkbox" {...register("acceptTerms")} />
                <label for="acceptTerms">
                    {" "}
                    Eu aceito os termos de uso de aplicação{" "}
                </label>
                {errors.acceptTerms?.message && <h4>{errors.acceptTerms?.message}</h4>}
            </div>
            <button type="submit">
                Cadastrar
            </button>
            <Link to="/">Já possui uma conta?</Link>

                    <Card dataForm={dataForm} />
            
        </form>
    );
};

export default Form;