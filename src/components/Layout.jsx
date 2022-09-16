import { useState, useEffect } from 'react';
import {
  Button,
  Container,
  Grid,
  MenuItem,
  TextField,
  Typography
} from '@mui/material';
import  MUIDataTable  from 'mui-datatables';
import { Octokit } from 'octokit';
import Header from './Header';
import BackdropCircular from './BackdropCircular';

const Layout = () => {
  const [isLoading, setLoading] = useState(false)
  const [prNumber, setPRNumber] = useState('')
  const [repo, setRepo] = useState('shop-manager')
  const [data, setData] = useState([])
  const [commitData, setCommitData] = useState([])
  const [page, setPage] = useState(1)

  const octokit = new Octokit({
    auth:  process.env.REACT_APP_API_KEY
  })

  useEffect(() => {
    if (data.length) {
      setCommitData(data.map((item, index) => ({
        increment: index + 1,
        author: item.author.login,
        message: item.commit.message,
        rel: item.commit.message.split("rel:")[1]
      })));
    }
  }, [data.length]);

  const handleFetchData = async () => {
    if (!prNumber) return;
    setLoading(true)
    try {
      const {data} = await octokit.request(`GET /repos/{owner}/{repo}/pulls/{pull_number}/commits`, {
        owner: 'JOyakawa1',
        repo,
        pull_number: prNumber,
        per_page: 100,
        page
      })
      setData(data)
    } catch (e) {
      console.log('Error! =>', e)
      setData('')
    }
    setLoading(false)
  }

  const columns = [
    {
      name: 'increment',
      label: '#'
    },
    {
      name: 'author',
      label: 'Author'
    },
    {
      name: 'message',
      label: 'Commit Message'
    },
    {
      name: 'rel',
      label: 'Related Ticket'
    }
  ]

  return (
    <>
      <Header />
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              name="repo"
              label="Repository"
              select
              value={repo}
              onChange={(event) => setRepo(event.target.value)}
            >
              <MenuItem value="shop-manager">Shop Manager Front</MenuItem>
              <MenuItem value="shop-manager-api">Shop Manager Back</MenuItem>
              <MenuItem value="shop">Shop</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              name="setPRNumber"
              label="Pull Request Number"
              value={prNumber}
              onChange={(event) => setPRNumber(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              name="page"
              label="Data Page"
              select
              value={page}
              onChange={(event) => setPage(event.target.value)}
            >
              {[1, 2, 3, 4, 5].map((i) =>(
                <MenuItem key={i} value={i}>{i}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={3}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleFetchData}
            >
              Get Data
            </Button>
          </Grid>
        </Grid>
      </Container>
      <Container sx={{mt: 5}}>
        {!!commitData.length
          ?
          <>
          <MUIDataTable
            title={''}
            data={commitData}
            columns={columns}
            options={{
              filter: true,
              filterType: 'textField',
              responsive: 'simple',
              expandableRowsHeader: false,
              expandableRowsOnClick: true,
              enableNestedDataAccess: ".",
              selectableRows: 'none',
              print: false,
              download: true,
              rowsPerPage: 20,
              rowsPerPageOptions: [20, 40, 80, 100]
            }}
          />
          </>
          :
          <Typography variant="h6">No data available! Check repo name and PR number and click 'Get Data' button</Typography>
        }
      </Container>
      <BackdropCircular loading={isLoading} />
    </>
  );
};
export default Layout;

