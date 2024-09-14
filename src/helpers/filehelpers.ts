import { rejects } from "assert"
import { resolve } from "path"


export const convertFileToLink = (file: File): Promise<string> => {

    return new Promise((resolve, reject) =>{
        var reader = new FileReader();
        reader.onload = function(evt) {
            resolve(evt.target?.result as string)
        };

        reader.onerror = function(evt) {
            reject(new Error("Error reading the file."))
        };

        reader.readAsDataURL(file)
    })
}

export const convertFileToBlob = (file: File): Promise<Blob> => {

    return new Promise((resolve, reject) =>{
        const reader = new FileReader();
        reader.onload = function(evt) {
            if (evt.target?.result instanceof ArrayBuffer) {
                const blob = new Blob([evt.target.result], { type: file.type })
                resolve(blob);
            } else {
                reject(new Error("Error converting file to Blob "))
            }
        };

        reader.onerror = function(evt) {
            reject(new Error("Error reading the file."))
        };

        reader.readAsArrayBuffer(file)
    })
}

export const convertBlobToUrl = (blob: Blob): string => {
    return URL.createObjectURL(blob)
}