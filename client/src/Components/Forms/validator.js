
export function isRequired(value, message){
    return value.trim() ? undefined : message || "Vui lòng nhập trường này"
}

