import {describe, expect, vi, test} from 'vitest';
import { render, screen, fireEvent } from "@testing-library/react"
import { QuantitySelector } from './quantitySelector';

describe("QuantitySelector", () => {
    test("increments value if it's less than max", async () => {
        const onChange = vi.fn()
        const { unmount } = render(
            <QuantitySelector value={1} max={10} onChange={onChange} />
        )
        fireEvent.click(await screen.findByLabelText("Augmenter la quantité"))
        expect(onChange).toHaveBeenCalled();
        unmount();
    })

    test("does not increment value if it's higher or equal to max", async () => {
        const onChange = vi.fn()
        render(
            <QuantitySelector value={10} max={10} onChange={onChange} />
        )
        fireEvent.click(await screen.findByLabelText("Augmenter la quantité"))
        expect(onChange).not.toHaveBeenCalled();
    })
})