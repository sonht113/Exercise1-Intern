
export const validate = (label:string, value: any) => {
    let err: string = ''
    if(value) {
        if(label === 'age') {
            if(value <= 0) {
                err = 'Age can not <= 0!'
                return err
            }
        }
        return err
    } else {
        err = `The ${label} is required!`
        return err
    }
}
