import BioEditor from "../profile-components/bioEditor.js";
import { render, waitFor, fireEvent } from "@testing-library/react";

test("when no bio is passed, the 'Add' button is rendered", () => {
    const { container } = render(<BioEditor />);
    expect(container.querySelector("div").innerHTML).toContain("button");
    expect(container.querySelector("button").innerHTML).toBe("Add");
});

test("when a bio is passed, the 'Edit' button is rendered", () => {
    const { container } = render(<BioEditor bio="this is a test bio" />);
    expect(container.querySelector("div").innerHTML).toContain("button");
    expect(container.querySelector("button").innerHTML).toBe("Edit");
});

test("clicking the 'Add' button causes a textarea and a 'Save' button to be rendered", () => {
    const { container } = render(<BioEditor />);
    expect(container.querySelector("button").innerHTML).toBe("Add");
    fireEvent.click(container.querySelector("button"));
    expect(container.querySelector("div").innerHTML).toContain("textarea");
    expect(container.querySelector("div").innerHTML).toContain("button");
    expect(container.querySelector("button").innerHTML).toBe("Save");
});

test("clicking the 'Edit' button causes a textarea and a 'Save' button to be rendered", () => {
    const { container } = render(<BioEditor bio="this is a test bio" />);
    expect(container.querySelector("button").innerHTML).toBe("Edit");
    fireEvent.click(container.querySelector("button"));
    expect(container.querySelector("div").innerHTML).toContain("textarea");
    expect(container.querySelector("div").innerHTML).toContain("button");
    expect(container.querySelector("button").innerHTML).toBe("Save");
});
