const alphabet: string = 'abcdefghijklmnopqrstuvwxyz';
const matrix: string[] = [];

for (let i = 0; i < alphabet.length; i++) {
    matrix.push(
        String(alphabet.slice(i) + alphabet.slice(0, i))
    );
}

const encrypt = (message: string, salt: string): string => {
    const blocks: string[] = [];
    const stringToEncrypt: string[] = message.split('').filter((val) => val !== ' ');

    for(let i = 0; i < stringToEncrypt.length; i++) {
        if (i % salt.length === 0) {
            blocks[blocks.length] = stringToEncrypt[i];
        } else {
            blocks[blocks.length - 1] += stringToEncrypt[i];
        }
    }

    const result: string[] = blocks.map((block) => block.split('').map((char, index) => {
        const row: number = alphabet.indexOf(salt[index].toLocaleLowerCase());
        const column: number = alphabet.indexOf(char.toLocaleLowerCase());

        if (row !== -1 && column !== -1) {
            return matrix[row][column];
        }

        throw new Error("Unresolvable symbol: " + char);
    }).join(''));

    return result.join('');
}

const decrypt = (crypt: string, salt: string): string => {
    const blocks: string[] = [];

    for(let i = 0; i < crypt.length; i++) {
        if (i % salt.length === 0) {
            blocks[blocks.length] = crypt[i];
        } else {
            blocks[blocks.length - 1] += crypt[i];
        }
    }

    const result: string[] = blocks.map((block) => 
        block.split('').map((char, index) => {
            const columnIndex: number = alphabet.indexOf(salt[index].toLocaleLowerCase());
            const resultChar: string = matrix.find((row, index) => row[columnIndex] === char)?.[0];

            return resultChar;
        }).join(''));

    return result.join('');
}

export {
    encrypt,
    decrypt,
}