




@validator()
class Modal {

    @isEmail("message")
    @isRequired("message")
    name = "";


    async vaildate(): Promise<{ isValid,errors }>{

        return {
            isValid: true,
            errors:[]
        }
    }
}



var model = new Modal();

const submit = async () => {
    var isValid = await model.vaildate();


}
