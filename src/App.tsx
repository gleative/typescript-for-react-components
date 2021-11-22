import React, { ReactElement, ReactNode } from 'react';

/**
 * Conventional Props
 */

function Heading({ title }: { title: string }) {
  return <h1>{title}</h1>;
}

// ? Funker ikke hvis eksempel HTML elementer er inkludert! (HTML !== string)
// function HeadingWithContent({ children }: { children: string }) {
//   return <h1>{children}</h1>;
// }
// * "ReactNode" Tar imot React elementer som string og HTML
function HeadingWithContent({ children }: { children: ReactNode }): ReactElement {
  return <h1>{children}</h1>;
}

/**
 * Default props
 */
const defaultContainerProps = {
  heading: <strong>Hi, I am default header!</strong>,
};

type ContainerProps = { children: string } & typeof defaultContainerProps;
// function Container({ heading, children }: { children: ReactNode } & typeof defaultContainerProps): ReactElement {
function Container({ heading, children }: ContainerProps): ReactElement {
  return (
    <div>
      <h1>{heading}</h1>
      {children}
    </div>
  );
}
// ! Viktig at du setter opp denne, ellers funker det ikkje!
Container.defaultProps = defaultContainerProps;

// ??? Min måte å gjøre det på... og fungerer som jeg forventer!
type Props = {
  heading?: ReactNode;
  children: ReactNode;
};

function ContainerDefaultProps({ heading = 'Jeg er default!', children }: Props) {
  return (
    <div>
      <h1>{heading}</h1>
      {children}
    </div>
  );
}

/**
 * Functional props
 */
// ? props.children - Tar inn en funksjon med number som parameter, og som returnerer ReactNode (HTML)
function TextWithNumber({
  heading,
  children,
}: {
  heading: (num: number) => ReactNode;
  children: (num: number) => ReactNode;
}) {
  const [state, setState] = React.useState<number>(1);

  return (
    <div>
      <h1>{heading(state)}</h1>
      <div>{children(state)}</div>
      <div>
        <button onClick={() => setState((prevState) => prevState + 1)}>Add</button>
      </div>
    </div>
  );
}

/**
 * List - ListItem (Kan være hvilket som helst navn du ønsker): Generic... kan ta imot string... number
 * Hvis du er KOMPONENT designer... dette er nice pattern!
 */
function List<ListItem>({ items, render }: { items: ListItem[]; render: (item: ListItem) => ReactNode }) {
  return (
    <ul>
      {items.map((item, idx) => (
        // ! Vi bruker funksjonen vi får fra parent
        <li key={idx}>{render(item)}</li>
      ))}
    </ul>
  );
}

function App() {
  return (
    <div>
      <Heading title="Heisann" />

      <HeadingWithContent>Hey</HeadingWithContent>
      <HeadingWithContent>
        <strong>Hey hey!</strong>
      </HeadingWithContent>

      <Container>Fusrodah</Container>
      {/* <Container heading="Hi, my name is">Glenn</Container> */}
      <ContainerDefaultProps>Default is very nice one!</ContainerDefaultProps>
      <ContainerDefaultProps heading="Jeg har tatt over default verdien">
        Default is very nice one!
      </ContainerDefaultProps>

      <TextWithNumber heading={(num: number) => <span>Header number is {num}</span>}>
        {(num: number) => <div>Todays number is {num}</div>}
      </TextWithNumber>

      <List items={['Glenn', 'Penn', 'Sven', 'Tien']} render={(item) => item.toUpperCase()} />
      <List items={[52, 39, 29, 51]} render={(item) => item + 2} />
    </div>
  );
}

export default App;
