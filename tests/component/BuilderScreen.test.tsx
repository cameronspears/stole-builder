import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BuilderScreen } from "@/components/layout/BuilderScreen";
import { resetStoreForTests } from "@/lib/store";

describe("BuilderScreen", () => {
  beforeEach(() => {
    resetStoreForTests();
    window.localStorage.clear();
  });

  it("adds text and patch items through wizard steps", async () => {
    const user = userEvent.setup();
    render(<BuilderScreen />);

    await user.click(screen.getByTestId("step-text"));
    await user.type(screen.getByTestId("new-text-input"), "Class of 2026");
    await user.click(screen.getByTestId("add-text-button"));

    expect(screen.getByTestId("text-item-0")).toHaveTextContent("Class of 2026");
    expect(screen.getByTestId("canvas-text-0")).toBeInTheDocument();

    await user.click(screen.getByTestId("step-patches"));
    await user.click(screen.getByTestId("add-patch-lotus"));

    expect(screen.getByTestId("patch-item-0")).toBeInTheDocument();
    expect(screen.getByTestId(/canvas-patch-/)).toBeInTheDocument();
  });

  it("supports undo and redo from history toolbar", async () => {
    const user = userEvent.setup();
    render(<BuilderScreen />);

    await user.click(screen.getByTestId("step-text"));
    await user.type(screen.getByTestId("new-text-input"), "Hello");
    await user.click(screen.getByTestId("add-text-button"));

    expect(screen.getByTestId("canvas-text-0")).toBeInTheDocument();

    await user.click(screen.getByTestId("undo-button"));
    expect(screen.queryByTestId("canvas-text-0")).not.toBeInTheDocument();

    await user.click(screen.getByTestId("redo-button"));
    expect(screen.getByTestId("canvas-text-0")).toBeInTheDocument();
  });

  it("validates review step before allowing download", async () => {
    const user = userEvent.setup();
    render(<BuilderScreen />);

    await user.click(screen.getByTestId("step-review"));

    const downloadButton = screen.getByTestId("download-order");
    expect(downloadButton).toBeDisabled();

    await user.type(screen.getByLabelText("Full Name"), "Cam Example");
    await user.type(screen.getByLabelText("Email"), "cam@example.com");
    await user.type(screen.getByLabelText("Phone"), "555-555-5555");
    await user.type(screen.getByLabelText("School"), "Laguna Creek High School");
    await user.type(screen.getByLabelText("Graduation Year"), "2026");
    await user.type(screen.getByLabelText("Event Date"), "2026-05-26");

    await user.click(screen.getByTestId("review-accepted"));
    await user.click(screen.getByTestId("disclaimer-accepted"));

    expect(downloadButton).toBeEnabled();
  });
});
