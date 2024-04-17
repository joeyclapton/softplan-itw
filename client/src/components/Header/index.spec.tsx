import React from "react";
import { render } from "@testing-library/react";
import Header from "./index";

const mockUser = {
  name: "John Doe",
  email: "john@doe.com",
  password: "johnjohn",
  avatar: "profile.png",
  job: "Developer"
};

describe("Header", () => {
  it("should render the user's name correctly", () => {
    const { getByText } = render(<Header user={mockUser} />);

    expect(getByText(`${mockUser.name}`)).toBeInTheDocument();
  });
});
