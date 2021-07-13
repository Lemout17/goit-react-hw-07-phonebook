import "modern-normalize/modern-normalize.css";
import s from "./App.module.css";
import Section from "./Section";
import Form from "./Form";
import Contacts from "./Contacts";
import ContactsFilter from "./Contacts/ContactsFilter";
import { Component } from "react";
import { connect } from "react-redux";
import contactsOperations from "../redux/contactsOperations";
import Loader from "react-loader-spinner";

class App extends Component {
  componentDidMount() {
    this.props.fetchContact();
  }

  render() {
    console.log(this.props.isLoading);
    return (
      <>
        <Section title={"Phonebook"}>
          <Form />
        </Section>

        <Section title={"Contacts"}>
          <div className={s.container}>
            <ContactsFilter />

            {this.props.contactsError && (
              <h2>{this.props.contactsError.message}</h2>
            )}

            {this.props.isLoading ? (
              <Loader type="Circles" color="#00BFFF" height={80} width={80} />
            ) : (
              <Contacts />
            )}
          </div>
        </Section>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.contacts.loading,
  contactsError: state.contacts.contactsError,
});

const mapDispatchToProps = (dispatch) => ({
  fetchContact: () => dispatch(contactsOperations.fetchContact()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
