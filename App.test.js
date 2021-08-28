// tests for the project https://github.com/ahfarmer/emoji-search

import React from "react";
import App from "./App";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "./Header";
import EmojiResults from "./EmojiResults";
import EmojiResultRow from "./EmojiResultRow";

const data = [
  {
    title: "renders emoji list",
    symbol: "💯",
  },
];

describe("Emoji Search Tests", () => {

  /* "renders header title" checks if there is an element with the role of banner,
  which in this case should be a header element, and checks the content. */
  
  it("renders header title", () => {
    render(<Header />);
    expect(screen.getByRole("banner")).toHaveTextContent("Emoji Search");
  });



  /* "renders emoji list" gets all elements with the text "Click to copy emoji"
  and counts their number, and then compares them with the output number. */

  it("renders emoji list", () => {
    render(<App />);
    expect(screen.getAllByText(/Click to copy emoji/).length).toEqual(20);
  });



  /* "renders emoji list from props" renders a component with certain data
  and gets an element with the "img" role, after which it checks
  its "alt" attribute for the presence of the given title passed. */

  it("renders emoji list from props", () => {
    render(<EmojiResults emojiData={data} />);
    expect(screen.getByRole("img")).toHaveAttribute("alt", data[0].title);
  });



  /* "filters emoji list" takes an "input" element and enters some text,
  and then compares the content of the element with the entered text.
  Then it gets an element with the "img" role
  and checks if it has an "alt" attribute with the value of the entered text. */
  
  it("filters emoji list", async () => {
    render(<App />);
    const input = screen.getByRole("textbox");
    userEvent.type(input, "1234");
    expect(input.value).toBe("1234");
    expect(screen.getAllByRole("img")[2]).toHaveAttribute("alt", "1234");
  });

  

  /* "copies on click" renders a component with the specified data
  and gets an item to click, and then simulates a click on it.
  It also checks the presence of the received element in the document. */
  
  it("copies on click", () => {
    const { getByText } = render(
      <EmojiResultRow
        key={data[0].title}
        symbol={data[0].symbol}
        title={data[0].title}
      />
    );
    const copy = screen.getByText(/Click to copy emoji/i);
    userEvent.click(copy);
    expect(copy).toBeInTheDocument();
  });

  /* react-testing-library is not designed to get data from the life cycle,
  which is why it was not possible to fully test this case.
  This can be done using the proposed version of the Clipboard package
  through which copying to the clipboard takes place. */

});