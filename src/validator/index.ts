
import { IValidator } from './interface';
import { validator, isRequired } from "./decorate";






@validator
class Modal{

    @isRequired()
    name = "";

}



var model = new Modal();

export const debugCode = async () => {

    var model = new Modal() as IValidator;


    var output = await model.vaildate();

    console.log(output, model);
}


