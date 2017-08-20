import habitat from 'preact-habitat'
import BasicAutocomplete from './basic-autocomplete'

const autocompleteHabitat = habitat(BasicAutocomplete)

autocompleteHabitat.render({
  selector: 'autocomplete-widget',
})
