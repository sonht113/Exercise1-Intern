
export const validate = (value: any) => {
    let err: string = ''
    if(value < 0) {
        err = "Age cannot be negative!"
        return err
    }
    if(value == 0 || value > 100) {
        err = "Age not valid!"
        return err
    }
    return err
}
