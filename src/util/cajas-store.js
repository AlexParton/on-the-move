import { writable } from 'svelte/store';

const cajas = writable([]);

const customStore = {
    subscribe: cajas.subscribe,
    setCajas: (boxes) => {
        cajas.set(boxes)
    },
    addCaja: (box) => {
        cajas.update(cajuelas => {
            return cajuelas.concat(box)
        })
    },
    updateCaja: (id, newItems) => {
        cajas.update(boxes => {
            const cajaIndex = boxes.findIndex(box => box.id === id);
            const updatedCaja = { ...boxes[cajaIndex], items: newItems}
            const updatedCajas = [...boxes];
            updatedCajas[cajaIndex] = updatedCaja;
            return updatedCajas; 
        })
    },
    deleteCaja: (id) => {
        cajas.update(boxes => {
            return boxes.filter(box => box.id !== id)
        });
    }
}

export default customStore