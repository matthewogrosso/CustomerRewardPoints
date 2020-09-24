function calculatePoints(transactionAmount) {
  let points = 0;

  if (transactionAmount > 100) {
    points = Math.floor((transactionAmount - 100) * 2 + 50);
  } else if (transactionAmount > 50) {
    points = Math.floor(transactionAmount - 50);
  }

  return points;
}

function getPointsString(transactions) {
  let pointsString = "";

  for (let i = 0; i < transactions.length; i++) {
    let transactionAmount = transactions[i].amount;
    pointsString =
      pointsString +
      `${i != 0 ? ", " : ""}$${transactionAmount} (${calculatePoints(
        transactionAmount
      )}pts)`;
  }

  return pointsString;
}

function calculatePointsTotal(transactions) {
  let pointsTotal = 0;

  for (let i = 0; i < transactions.length; i++) {
    pointsTotal = pointsTotal + calculatePoints(transactions[i].amount);
  }

  return pointsTotal;
}

const transactions = {
  "January-2020": {
    customer001: [
      {
        transactionId: "c1t101032020",
        date: "01-03-2020",
        amount: 135.39
      },
      {
        transactionId: "c1t201072020",
        date: "01-07-2020",
        amount: 45.31
      },
      {
        transactionId: "c1t301202020",
        date: "01-20-2020",
        amount: 243.59
      }
    ],
    customer002: [
      {
        transactionId: "c2t101122020",
        date: "01-21-2020",
        amount: 55.27
      },
      {
        transactionId: "c2t201122020",
        date: "01-22-2020",
        amount: 155.27
      }
    ],
    customer003: [
      {
        transactionId: "c3t101122020",
        date: "01-12-2020",
        amount: 5.78
      },
      {
        transactionId: "c3t201172020",
        date: "01-17-2020",
        amount: 75.34
      },
      {
        transactionId: "c3t301252020",
        date: "01-25-2020",
        amount: 200.53
      }
    ],
    customer004: [
      {
        transactionId: "c4t101122020",
        date: "01-02-2020",
        amount: 235.78
      },
      {
        transactionId: "c4t201172020",
        date: "01-27-2020",
        amount: 315.34
      },
      {
        transactionId: "c4t301252020",
        date: "01-25-2020",
        amount: 200.53
      },
      { transactionId: "c4t201172020", date: "01-29-2020", amount: 7.24 },
      { transactionId: "c4t201172020", date: "01-29-2020", amount: 77.31 }
    ]
  }
};

class TableHeaders extends React.Component {
  render() {
    return (
      <tr>
        <th>Customer ID</th>
        <th>Transactions ({this.props.month})</th>
        <th>Points Total</th>
      </tr>
    );
  }
}

class CustomerTableData extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pointsString: "",
      pointsTotal: 0
    };
  }

  componentDidMount() {
    this.updatePointsString();
    this.updatePointsTotal();
  }

  updatePointsString() {
    this.setState((state, props) => ({
      pointsString: getPointsString(props.transactions)
    }));
  }

  updatePointsTotal() {
    this.setState((state, props) => ({
      pointsTotal: calculatePointsTotal(props.transactions)
    }));
  }

  render() {
    return (
      <tr>
        <td>{this.props.customer}</td>
        <td>{this.state.pointsString}</td>
        <td>{this.state.pointsTotal}</td>
      </tr>
    );
  }
}

function CustomerTable() {
  const transactionObjectKeys = Object.keys(transactions["January-2020"]);

  const customerDataRows = transactionObjectKeys.map((customerKey) => (
    <CustomerTableData
      customer={customerKey}
      transactions={transactions["January-2020"][customerKey]}
    />
  ));

  return (
    <table className="customerTable">
      <TableHeaders month="January 2020" />
      {customerDataRows}
    </table>
  );
}

ReactDOM.render(
  <CustomerTable />,
  document.getElementById("customerTableData")
);
