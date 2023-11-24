import {z, ZodError} from 'zod';
import Client from "../model/entities/Client";

function validaCpf(cpf: string): boolean {
  let validate = true;
  const padraoCPF = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
  if (!cpf.toLowerCase().match(padraoCPF)) {
    validate = false;
  }
  return validate;
}

type ClientDTO = Client & {
  associationId:string;
}

export function clientValidateZod(client:ClientDTO){
  // Fazendo o schema
  const schemaZod = z.object({
    name: z.string({required_error:'name é obrigatório'}).trim()
          .min(3,'nome deve ter no minimo 3 caracteres'),
    username: z.string({required_error:'email é obrigatório'}).trim()
          .email("E-mail inválido"),
    password:z.string({required_error:'password é obrigatório'}).trim()
            .min(6, 'A senha deve ter ao menos 6 dígitos'),
    cpf: z.string({required_error:'cpf é obrigatório'}).trim()
            .refine((value)=> validaCpf(value),{message:'cpf incorreto: digite no padrão ddd.ddd.ddd-dd'}),
    latitude: z.number({required_error: 'latitude obrigadtório'}),
    longitude: z.number({required_error: 'longitude obrigadtório'}),
    associationId:z.string({required_error:'campo é obrigatório'}),
  })

      //validando com o validate do schema
  const result = schemaZod.safeParse(client);// aqui tras todas as mensagens onde teve errors
  return result

}